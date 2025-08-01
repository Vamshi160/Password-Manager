
export type Category = 'website' | 'email' | 'username';

export type Usecase = 'Default' | 'Private' | 'Gaming';

export interface PasswordEntry {
  id: string;
  category: Category;
  username: string;
  password: {
    value: string;
    isEncrypted?: boolean; // For future use
  };
  usecase: Usecase;
  remark?: string;
  createdAt: string;
}
