import React, { useState, useEffect } from 'react';
import Icon from '../common/Icon';
import { useSelector, useDispatch } from 'react-redux';
import { editTodo, deleteTodo } from '../../redux/actions/action-creators';
import Error from '../common/Error';
export default function TodoTable(props) {
	return (
		<div>
			{props.data.length > 0 ? <TheTable data={props.data} /> : 'No data'}
		</div>
	);
}

function TheTable(props) {
	return (
		<div className="table-container">
			<table className="table is-hoverable is-fullwidth">
				<thead>
					<tr>
						<th>No.</th>
						<th>Title</th>
						<th>Description</th>
						<th>Created At</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{props.data.map((val, i) => {
						return <TheRow key={i} no={i + 1} val={val} />;
					})}
				</tbody>
			</table>
		</div>
	);
}

function TheRow({ val, no }) {
	const [isModalOpen, openModal] = useState(false);
	function handleClick(e) {
		e.preventDefault();
		openModal(true);
	}
	function closeModal() {
		openModal(false);
	}
	return (
		<tr>
			<th>
				<WrapperLink onClick={handleClick}>{no}</WrapperLink>
				{isModalOpen && (
					<DetailModal
						isOpen={isModalOpen}
						close={closeModal}
						todo={val}
					/>
				)}
			</th>
			<td>
				<WrapperLink onClick={handleClick}>
					{val.title ? val.title : '-'}
				</WrapperLink>
			</td>
			<td>
				<WrapperLink onClick={handleClick}>
					{val.description ? val.description : '-'}
				</WrapperLink>
			</td>
			<td>
				<WrapperLink onClick={handleClick}>{val.createdAt}</WrapperLink>
			</td>
			<td>
				<WrapperLink onClick={handleClick}>
					{val.status ? (
						<Icon
							icon="check-circle"
							className="has-text-success"
						/>
					) : (
						<Icon icon="times-circle" className="has-text-danger" />
					)}
				</WrapperLink>
			</td>
		</tr>
	);
}

function WrapperLink(props) {
	return (
		<a href="" onClick={props.onClick}>
			{props.children}
		</a>
	);
}

function DetailModal({ todo, isOpen, close }) {
	const currentIndex = useSelector(state => {
		return state.todos.findIndex(el => {
			return el.id === todo.id;
		});
	});
	const stateTodo = useSelector(state => {
		return state.todos[currentIndex];
	});
	const dispatch = useDispatch();
	function handleClose() {
		close();
	}
	function handleEdit() {
		close();
		dispatch(editTodo(stateTodo));
	}
	function handleDelete() {
		dispatch(deleteTodo(currentIndex));
		close();
	}
	return (
		<div className={`modal ${isOpen ? 'is-active' : ''}`}>
			<div className="modal-background" onClick={handleClose}></div>
			<div className="modal-card">
				<header className="modal-card-head">
					<p className="modal-card-title">
						{todo.title ? todo.title : '(No title)'}
					</p>
					<button
						className="delete"
						aria-label="close"
						onClick={handleClose}
					></button>
				</header>
				<section className="modal-card-body">
					<div>
						{todo.description
							? todo.description
							: '(No description)'}
					</div>
					<div>
						This task is {todo.status === 1 ? '' : 'not'} done.
					</div>
				</section>
				<footer className="modal-card-foot">
					<button className="button is-success" onClick={handleEdit}>
						<Icon icon="edit" className="fa-fw" />
					</button>
					&nbsp;
					<button className="button is-danger" onClick={handleDelete}>
						<Icon icon="trash" className="fa-fw" />
					</button>
				</footer>
			</div>
		</div>
	);
}
