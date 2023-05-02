export { HomeTable };

function HomeTable(props) {
    const { items } = props

    return <div>
        <h3 className="mt-5">Facturas disponibles</h3>
        {items.length &&
            <table className="table table-sm table-hover">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Text</th>
                </tr>
                </thead>
                <tbody>
                    {items.map(f => {
                        return (
                            <tr key={f.id}>
                                <td>{f.id}</td>
                                <td>{f.text}</td>
                            </tr>
                        )})}
                </tbody>
            </table>
        }
        {items.loading && <div className="spinner-border spinner-border-sm"></div>}
        {items.error && <div className="text-danger">Error cargando facturas: {items.error.message}</div>}
    </div>
}