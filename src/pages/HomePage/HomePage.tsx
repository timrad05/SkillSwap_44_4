import { Filter } from '../../widgets/Filter';
import { Header } from '../../widgets/Header';
import { Footer } from '../../widgets/Footer';
import { RecommendedCards } from '../../widgets/RecommendedCards';
import { Cards } from '../../widgets/Cards';
import type { HomePageProps } from './HomePage.types';
import styles from './HomePage.module.scss';

export const HomePage = ({
	headerProps,
	filterProps,
	cardsProps,
	recommendedProps,
	footerProps,
}: HomePageProps) => {
	return (
		<div className={styles.page}>
			{headerProps && <Header {...headerProps} />}

			<main className={styles.main}>
				<div className={styles.layout}>
					{filterProps && (
						<aside className={styles.sidebar}>
							<Filter {...filterProps} />
						</aside>
					)}

					<div className={styles.content}>
						{cardsProps && (
							<>
								<section className={styles['cards-section']}>
									<Cards {...cardsProps} />
								</section>

								<section className={styles['cards-section']}>
									<Cards {...cardsProps} />
								</section>
							</>
						)}

						{recommendedProps && (
							<section className={styles['recommended-section']}>
								<RecommendedCards {...recommendedProps} />
							</section>
						)}
					</div>
				</div>
			</main>

			{footerProps && <Footer {...footerProps} />}
		</div>
	);
};
