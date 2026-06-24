export default function Icon({ name, className = '' }) {
  return <span className={'material-icons ' + className}>{name}</span>
}
