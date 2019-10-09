import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

class PrestamoLibro extends Component {
	state = {};
	render() {
		// Extraer el libro
		const { libro } = this.props;

		// mostrar el spinner
		if (!libro) return <Spinner />;

		return (
			<div className="row">
				<div className="row">
					<div className="col-12 mb-4">
						<Link to={'/'} className="btn btn-secondary">
							<i className="fas fa-arrow-circle-left" /> {''} Volver al Listado
						</Link>
					</div>
					<div className="col-12">
						<h2>
							<i className="fas fa-book" /> {''} Solicitar Prestamo : {libro.titulo}
						</h2>

						<div className="row justify-content-center mt-5">
							<div className="col-md-8">
								<form>
									<legend className="color-primary text-center">
										Busca el Suscriptor por Código
									</legend>

									<div className="form-group">
										<input
											type="text"
											name="busqueda"
											className="form-control"
											onChange={this.leerDato}
										/>
									</div>
									<input type="submit" value="Buscar Alumno" className="btn btn-success btn-block" />
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

PrestamoLibro.propTypes = {
	firestore: PropTypes.object.isRequired
};

export default compose(
	firestoreConnect((props) => [
		{
			collection: 'libros',
			storeAs: 'libro',
			doc: props.match.params.id
		}
	]),
	connect(({ firestore: { ordered } }, props) => ({
		libro: ordered.libro && ordered.libro[0]
	}))
)(PrestamoLibro);
