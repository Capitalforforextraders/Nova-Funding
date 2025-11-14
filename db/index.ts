import type { User, AccountStatus } from '../types';

// --- A simple in-browser backend using AI Studio's cloudStore ---

// Fix: Declare the 'cs' property on the Window interface to resolve TypeScript errors.
declare global {
    interface Window {
      cs: {
        cloudStore: {
          get(key: string): Promise<string | null>;
          set(key: string, value: string): Promise<void>;
        };
      };
    }
}

const DB_KEY = 'nova_funding_users';

/**
 * Creates a fallback store using localStorage that mimics the cloudStore API.
 * This is used if the AI Studio environment fails to provide the cloudStore.
 */
const createLocalStorageStore = (): typeof window.cs.cloudStore => {
    console.warn(
        "AI Studio cloudStore failed to initialize. Falling back to localStorage. " +
        "Data will be stored in your browser only and will not be shared across devices."
    );
    return {
        get: (key: string): Promise<string | null> => {
            return Promise.resolve(localStorage.getItem(key));
        },
        set: (key: string, value: string): Promise<void> => {
            localStorage.setItem(key, value);
            return Promise.resolve();
        },
    };
};

/**
 * Safely gets the cloudStore object, waiting for it to be initialized.
 * If initialization times out, it provides a localStorage-based fallback to prevent app crashes.
 */
const getCloudStore = (): Promise<typeof window.cs.cloudStore> => {
    return new Promise((resolve) => {
        let attempts = 0;
        const maxAttempts = 50; // Wait for up to 5 seconds
        const interval = 100;   // Check every 100ms

        const check = () => {
            if (window.cs && window.cs.cloudStore) {
                resolve(window.cs.cloudStore);
            } else {
                attempts++;
                if (attempts < maxAttempts) {
                    setTimeout(check, interval);
                } else {
                    // Instead of rejecting, resolve with the fallback.
                    resolve(createLocalStorageStore());
                }
            }
        };

        check();
    });
};


// Initialize the database with a default admin if it doesn't exist
export const initializeDB = async () => {
    const cloudStore = await getCloudStore();
    const usersStr = await cloudStore.get(DB_KEY);
    if (!usersStr) {
        const adminUser: User = {
            id: 'admin_' + Date.now(),
            name: 'Admin',
            email: 'admin@novafunding.com',
            passwordHash: 'adminpassword', // In a real app, NEVER store plain text passwords.
            country: 'N/A',
            signupDate: new Date().toISOString(),
            accountSize: 0,
            status: 'active',
            payoutHistory: [],
            role: 'admin',
        };
        await cloudStore.set(DB_KEY, JSON.stringify([adminUser]));
    }
};

export const getAllUsers = async (): Promise<User[]> => {
    const cloudStore = await getCloudStore();
    const usersStr = await cloudStore.get(DB_KEY);
    return usersStr ? JSON.parse(usersStr) : [];
};

export const getUserById = async (id: string): Promise<User | null> => {
    const users = await getAllUsers();
    return users.find(u => u.id === id) || null;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
    const users = await getAllUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
};

export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
    const user = await getUserByEmail(email);
    // Plain text comparison for this environment. In production, use bcrypt.compare.
    if (user && user.passwordHash === password) {
        return user;
    }
    return null;
};

export const createUser = async (userData: Omit<User, 'id' | 'signupDate' | 'payoutHistory' | 'role'>): Promise<User | null> => {
    const existingUser = await getUserByEmail(userData.email);
    if (existingUser) {
        throw new Error("An account with this email already exists.");
    }
    const users = await getAllUsers();
    const newUser: User = {
        ...userData,
        id: 'user_' + Date.now(),
        signupDate: new Date().toISOString(),
        payoutHistory: [],
        role: 'user'
    };
    users.push(newUser);
    const cloudStore = await getCloudStore();
    await cloudStore.set(DB_KEY, JSON.stringify(users));
    return newUser;
};

export const updateUser = async (userId: string, updates: Partial<User>): Promise<User | null> => {
    const users = await getAllUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        return null;
    }
    users[userIndex] = { ...users[userIndex], ...updates };
    const cloudStore = await getCloudStore();
    await cloudStore.set(DB_KEY, JSON.stringify(users));
    return users[userIndex];
};

export const deleteUser = async (userId: string): Promise<boolean> => {
    let users = await getAllUsers();
    const initialLength = users.length;
    users = users.filter(u => u.id !== userId);
    if (users.length < initialLength) {
        const cloudStore = await getCloudStore();
        await cloudStore.set(DB_KEY, JSON.stringify(users));
        return true;
    }
    return false;
};
