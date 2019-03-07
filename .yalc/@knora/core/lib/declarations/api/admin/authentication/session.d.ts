import { CurrentUser } from '../../..';
export interface Session {
    id: number;
    user: CurrentUser;
}
