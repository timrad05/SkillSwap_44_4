import type { City } from '../../../entities/city/model/types';
import type { User } from '../../../entities/user/model';

export interface ProfileInfoProps {
	className?: string;
	avatarUrl?: string;
	user?: User | null;
	cities?: City[];
}
