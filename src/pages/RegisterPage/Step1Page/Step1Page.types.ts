import type { Step1FormProps } from '../../../features/auth/registration/ui/Step1Form';
import type { Step1FormData } from '../../../features/auth/registration/ui/Step1Form/Step1Form.types';
import type { InfoProps } from '../../../shared/ui/Info';
import type { HeaderProps } from '../../../widgets/Header';
import type { ProgressBarProps } from '../../../widgets/ProgressBar';

export interface Step1PageProps {
	headerProps?: HeaderProps;
	progressBarProps?: ProgressBarProps;
	step1FormProps?: Step1FormProps;
	infoProps?: InfoProps;
	onSubmit?: (data: Step1FormData) => void;
	currentStep?: number;
	totalSteps?: number;
}
