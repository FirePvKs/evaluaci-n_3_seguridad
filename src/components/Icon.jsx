export default function Icon({ name, size = 20, style = {} }) {
  return (
    <span
      className="material-icons"
      style={{ fontSize: size, lineHeight: 1, display: 'inline-flex', alignItems: 'center', ...style }}
    >
      {name}
    </span>
  )
}
