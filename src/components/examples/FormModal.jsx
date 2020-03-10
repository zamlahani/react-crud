import React, { Component, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { closeFormModal } from '../../redux/actions/action-creators';
import Icon from '../common/Icon';
export default function FormModal({ content, close }) {
	const isOpen = useSelector(state => state.formModal.isOpen);
	const isCreateForm = useSelector(state => state.formModal.isCreateForm);
	const id = useSelector(state => state.formModal.id);
	const title = useSelector(state => state.formModal.title);
	const description = useSelector(state => state.formModal.description);
	const [state, setState] = useState({
		id: !_.isEmpty(id) ? id : null,
		title: !_.isEmpty(title) ? title : '',
		description: !_.isEmpty(description) ? description : '',
		status: !_.isEmpty(status) ? status : 0
	});
	const dispatch = useDispatch();

	function handleChange(e) {
		const target = e.target;
		const value =
			target.name === 'status' ? target.checked * 1 : target.value;
		const name = target.name;
		setState({ [name]: value });
	}

	function handleSubmit(e) {
		e.preventDefault();
		console.log(e.target);
	}
	useEffect(() => {
		console.log(state);
	}, [state]);
	return (
		<div className={`modal ${isOpen ? 'is-active' : ''}`}>
			<div className="modal-background"></div>
			<div className="modal-card">
				<header className="modal-card-head">
					<p className="modal-card-title">
						{isCreateForm ? 'Add A Task' : 'Edit The Task'}
					</p>
					<button
						onClick={() => dispatch(closeFormModal())}
						className="delete"
						aria-label="close"
					></button>
				</header>
				<section className="modal-card-body">
					<form action="" onSubmit={handleSubmit}>
						<div className="field">
							<label className="label">Title</label>
							<div className="control">
								<input
									onChange={handleChange}
									className="input"
									type="text"
									name="title"
									defaultValue={title}
									placeholder="Some Title"
								/>
							</div>
						</div>
						<div className="field">
							<label className="label">Description</label>
							<div className="control">
								<input
									onChange={handleChange}
									className="input"
									type="text"
									name="description"
									defaultValue={description}
									placeholder="You can type some description here..."
								/>
							</div>
						</div>
						<div className="field">
							<div className="control">
								<label className="checkbox">
									<input
										type="checkbox"
										name="status"
										onChange={handleChange}
									/>
									&nbsp; This task is already done
								</label>
							</div>
						</div>
						<button type="submit" className="button is-success">
							<Icon icon="save" />
						</button>
						&nbsp;
						{!isCreateForm && (
							<button className="button is-danger">
								<Icon icon="trash" />
							</button>
						)}
					</form>
				</section>
			</div>
		</div>
	);
}
