import SvgColor from "../components/SvgColor";

const renderIcon = (name, color) => (
  <SvgColor color={color} src={`/icons/${name}.svg`} />
);

export default renderIcon;
