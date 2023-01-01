function EditField ({ type, value, name, color, error, onChange }) {

  return (
    <input type={type} name={name} value={value} onChange={onChange}
      className={`absolute left-6 top-2/4 -translate-y-1/2 pl-2 w-3/4 border-b outline-none ${'bg-'+color} capitalize ${error ? 'border-red-600' : 'border-secondary' }`}
    />
  )
}

export default EditField;
