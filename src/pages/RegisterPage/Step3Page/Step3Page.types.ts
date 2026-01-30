import type { Step3FormProps } from '../../../features/auth/registration/ui/Step3Form';
import type { step3FormData } from '../../../features/auth/registration/ui/Step3Form/Step3Form.types';
import type { InfoProps } from '../../../shared/ui/Info';
import type { HeaderProps } from '../../../widgets/Header';
import type { ProgressBarProps } from '../../../widgets/ProgressBar';

export interface Step3PageProps {
	headerProps?: HeaderProps;
	progressBarProps?: ProgressBarProps;
	step3FormProps?: Step3FormProps;
	infoProps?: InfoProps;
	onSubmit?: (data: step3FormData) => void;
}
