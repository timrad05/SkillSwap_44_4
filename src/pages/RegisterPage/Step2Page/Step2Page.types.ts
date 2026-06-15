import type { Step2FormProps } from '../../../features/auth/registration/ui/Step2Form';
import type { Step2FormData } from '../../../features/auth/registration/ui/Step2Form/Step2Form.types';
import type { InfoProps } from '../../../shared/ui/Info';
import type { HeaderProps } from '../../../widgets/Header';
import type { ProgressBarProps } from '../../../widgets/ProgressBar';

export interface Step2PageProps {
	headerProps?: HeaderProps;
	progressBarProps?: ProgressBarProps;
	step2FormProps?: Step2FormProps;
	infoProps?: InfoProps;
	onSubmit?: (data: Step2FormData) => void;
}
