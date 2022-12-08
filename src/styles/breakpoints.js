const sizes = {
	sm: "768px",
	md: "1024px",
	lg: "1440px",
	xl: "2560px",
};

export const device = {
	phone: `(max-width: ${sizes.sm})`,
	tablet: `(max-width: ${sizes.md})`,
	laptop: `(max-width: ${sizes.lg})`,
	desktop: `(min-width: ${sizes.lg})`,
};
