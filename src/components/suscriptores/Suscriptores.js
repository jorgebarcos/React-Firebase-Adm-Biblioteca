import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

const Suscriptores = ({ suscriptores }) => {
	if (!suscriptores) return <h1>Cargando...</h1>;

	return (
		<div className="row">
			<div className="col-md-12 mb-4">
				<Link to="/suscriptores/nuevo" className="btn btn-primary">
					<i className="fas fa-plus" /> {''} Nuevo Suscriptor
				</Link>
				<div className="col-md-8">
					<h2>
						<i className="fas fa-users" /> Suscriptores
					</h2>
				</div>
			</div>

			<table className="table table-striped mt-4">
				<thead className="text-light bg-primary">
					<tr>
						<th>Nombre</th>
						<th>Carrera</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{suscriptores.map((suscriptor) => (
						<tr key={suscriptor.id}>
							<td>
								{suscriptor.nombre} {suscriptor.apellido}
							</td>
							<td>{suscriptor.carrera}</td>
							<td>
								<Link
									to={`/suscriptores/mostrar/${suscriptor.id}`}
									className="btn btn-success btn-block"
								>
									<i className="fas fa-angle-double-right" /> {''} Más Información
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default compose(
	firestoreConnect([
		{
			collection: 'suscriptores'
		}
	]),
	connect((state, props) => ({
		suscriptores: state.firestore.ordered.suscriptores
	}))
)(Suscriptores);
