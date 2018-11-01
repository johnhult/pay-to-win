import React from 'react';
import PropTypes from 'prop-types';

import createImageUrl from 'helpers/createImageUrl.mjs';
import breakpoints from 'helpers/breakpoints.mjs';

import ImageStyled from './ImageStyled';

const sizeFull = 100;

const Image = ({ src, caption, sizes, responsive, width }) => {
	const setupImageMetadata = () => {
		const defaultCaption = 'Image caption';

		let imageCaption = '';
		if (!caption || caption === '' || caption === undefined || caption === null) {
			imageCaption = defaultCaption;
		} else {
			imageCaption = caption;
		}
		return imageCaption;
	};

	/*
	** Dynamic image URL creator, example is based on images served from Contentful

	const createImageUrl = (src, format, size, qualityLevel) => {
		if (src !== undefined) {
			if (!src.includes('images.ctfassets.net')) {
				return src;
			} else if (src.includes('images.ctfassets.net')) {
				const windowWidth = window.innerWidth;
				let quality = 1;

				if (qualityLevel) {
					if (windowWidth <= 1024) {
						size = 1000;
						quality = qualityLevel * 0.7;
					} else {
						quality = qualityLevel;
					}
				}

				if (props.small) {
					quality = 30;
					size = 400;
				}

				if (props.medium) {
					quality = 30;
					size = 800;
				}

				const fixedPath = `https:${src}?w=${size}&fm=${format}&q=${quality}`;
				return fixedPath;
			}
		} else {
		}
	};
	*/

	const imgCaption = setupImageMetadata();

	if (responsive) {
		return (
			<ImageStyled>
				<img
					data-srcSet={`
						${createImageUrl(src, 'jpg', 2880, 30)} 2880w,
						${createImageUrl(src, 'jpg', 1920, 30)} 1920w,
						${createImageUrl(src, 'jpg', 1440, 30)} 1440w,
						${createImageUrl(src, 'jpg', 1024, 30)} 1024w,
						${createImageUrl(src, 'jpg', 768, 30)} 768w,
						${createImageUrl(src, 'jpg', 480, 30)} 480w,
						${createImageUrl(src, 'jpg', 320, 30)} 320w`}
					data-sizes={`
						(max-width: ${breakpoints.breakpointsXs}px) ${sizes.xs ? sizes.s : sizeFull}%,
						(max-width: ${breakpoints.breakpointsS}px) ${sizes.s ? sizes.s : sizeFull}%,
						(max-width: ${breakpoints.breakpointsM}px) ${sizes.m ? sizes.m : sizeFull}%,
						(max-width: ${breakpoints.breakpointsL}px) ${sizes.l ? sizes.l : sizeFull}%,
						(max-width: ${breakpoints.breakpointsXl}px) ${sizes.xl ? sizes.xl : sizeFull}%,
					`}
					src="/assets/img/image.jpg"
					key={`${src}${Math.random(0, 10000)}`}
					alt={imgCaption}
					title={imgCaption}
					style={{ width, maxWidth: '100%' }}
					className="lazyload"
				/>
			</ImageStyled>
		);
	} else if (!responsive) {
		return (
			<img
				data-src={src}
				src={src}
				alt={imgCaption}
				title={imgCaption}
				style={{ width }}
				className="lazyload"
			/>
		);
	}
	return true;
};

Image.propTypes = {
	src: PropTypes.string.isRequired,
	caption: PropTypes.string,
	sizes: PropTypes.object,
	width: PropTypes.string,
	responsive: PropTypes.bool
};

Image.defaultProps = {
	caption: '',
	width: '100%',
	sizes: {},
	responsive: false
};

export default Image;
