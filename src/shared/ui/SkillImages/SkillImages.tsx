import clsx from 'clsx';
import { type FC, useEffect, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';
import chevronIcon from '../../assets/icons/chevron-right.svg';
import style from './SkillImages.module.scss';
import type { SkillImagesProps } from './SkillImages.types';

export const SkillImages: FC<SkillImagesProps> = ({ images, className }) => {
	const prevRef = useRef<HTMLDivElement>(null);
	const nextRef = useRef<HTMLDivElement>(null);
	const swiperRef = useRef<SwiperType | null>(null);

	// привязываем клики к стрелкам
	useEffect(() => {
		const prev = prevRef.current;
		const next = nextRef.current;

		if (prev) prev.onclick = () => swiperRef.current?.slidePrev();
		if (next) next.onclick = () => swiperRef.current?.slideNext();

		return () => {
			if (prev) prev.onclick = null;
			if (next) next.onclick = null;
		};
	}, []);

	if (images.length < 4) {
		return <div>Минимум 4 изображения</div>;
	}

	const thumbnails = images.slice(1, 4);
	const remaining = images.length - 4;

	return (
		<div className={clsx(style.container, className)}>
			<div className={style.main}>
				<Swiper
					modules={[Navigation]}
					navigation={false} // отключил встроенные стрелки
					loop
					spaceBetween={0}
					slidesPerView={1}
					className={style.mainSwiper}
					onSwiper={(swiper) => {
						swiperRef.current = swiper;
					}}
				>
					{images.map((img, index) => (
						<SwiperSlide key={index}>
							<img
								src={img}
								alt={`Skill image ${index + 1}`}
								className={style.mainImage}
							/>
						</SwiperSlide>
					))}
				</Swiper>

				{/* кастомные стрелки */}
				<div ref={prevRef} className={clsx(style.arrow, style.prev)}>
					<img
						src={chevronIcon}
						alt="Предыдущее"
						className={clsx(style.arrowIcon, style.reverse)}
					/>
				</div>
				<div ref={nextRef} className={clsx(style.arrow, style.next)}>
					<img src={chevronIcon} alt="Следующее" className={style.arrowIcon} />
				</div>
			</div>

			<div className={style.thumbnails}>
				{thumbnails.map((img, index) => (
					<div key={index} className={style.thumbnail}>
						<img
							src={img}
							alt={`Thumbnail ${index + 1}`}
							className={style.thumbnailImage}
						/>
						{index === 2 && remaining > 0 && (
							<div className={style.overlay}>+{remaining}</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};
