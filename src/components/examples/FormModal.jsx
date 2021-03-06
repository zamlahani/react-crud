import React, { Component, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import {
	closeFormModal,
	storeTodo,
	updateTodo
} from '../../redux/actions/action-creators';
import Icon from '../common/Icon';
export default function FormModal({ close }) {
	const isOpen = useSelector(state => state.formModal.isOpen);
	const isCreateForm = useSelector(state => state.formModal.isCreateForm);
	const id = useSelector(state => state.formModal.id);
	const title = useSelector(state => state.formModal.title);
	const description = useSelector(state => state.formModal.description);
	const status = useSelector(state => state.formModal.status);
	const createdAt = useSelector(state => state.formModal.createdAt);
	const currentIndex = useSelector(state => {
		return state.todos.findIndex(el => {
			return el.id === id;
		});
	});
	const [fields, setFields] = useState({
		title,
		description,
		status
	});
	const dispatch = useDispatch();

	function handleChange(e) {
		const target = e.target;
		const value =
			target.name === 'status' ? target.checked * 1 : target.value;
		const name = target.name;
		setFields(fields => ({ ...fields, [name]: value }));
	}

	function handleSubmit(e) {
		e.preventDefault();
		let time = moment().format('YYYY-MM-DD HH:mm'); //"2019-11-15 04:00"
		let data = {
			id: id !== null ? id : uuidv4(),
			...fields,
			createdAt: createdAt.length > 0 ? createdAt : time
		};
		dispatch(
			isCreateForm ? storeTodo(data) : updateTodo(data, currentIndex)
		);
		dispatch(closeFormModal());
	}
	return (
		<div className={`modal ${isOpen ? 'is-active' : ''}`}>
			<div
				className="modal-background"
				onClick={() => dispatch(closeFormModal())}
			></div>
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
									value={fields.title}
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
									value={fields.description}
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
										checked={fields.status}
									/>
									&nbsp; This task is already done
								</label>
							</div>
						</div>
						<button type="submit" className="button is-success">
							<Icon icon="save" />
						</button>
					</form>
				</section>
			</div>
		</div>
	);
}
