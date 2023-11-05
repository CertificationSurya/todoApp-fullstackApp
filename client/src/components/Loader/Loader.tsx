import ReactLoading from 'react-loading';

type LoadingType = "blank" | "balls" | "bars" | "bubbles" | "cubes" | "cylon" | "spin" | "spinningBubbles" | "spokes";


type LoaderPropType = {
    type: LoadingType;
    color: string,
}

const Loader = ({ type, color } : LoaderPropType) => (
	<ReactLoading className='center-element' type={type} color={color} delay={100} height={'20%'} width={'20%'} />
);

export default Loader;