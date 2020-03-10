import React, { useState } from 'react';
import Icon from '../common/Icon';
import { useSelector, useDispatch } from 'react-redux';
import { editTodo, deleteTodo } from '../../redux/actions/action-creators';

export default function TodoTable(props) {
	return (
		<table className="table is-hoverable">
			<tbody>
				{props.data.map((val, i) => {
					return <TheRow key={i} no={i + 1} val={val} />;
				})}
			</tbody>
		</table>
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
			<td>
				<WrapperLink>{no}</WrapperLink>
			</td>
			<td>
				<WrapperLink onClick={handleClick}>{val.title}</WrapperLink>
				<DetailModal
					isOpen={isModalOpen}
					close={closeModal}
					todo={val}
				/>
			</td>
			<td>
				<WrapperLink>{val.description}</WrapperLink>
			</td>
			<td>
				<WrapperLink>{val.status}</WrapperLink>
			</td>
			<td>
				<WrapperLink>{val.createdAt}</WrapperLink>
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
					<p className="modal-card-title">{todo.title}</p>
					<button
						className="delete"
						aria-label="close"
						onClick={handleClose}
					></button>
				</header>
				<section className="modal-card-body">
					<div>{todo.description}</div>
					<div>
						This task is {todo.status === 1 ? '' : 'not'} done.
					</div>
				</section>
				<footer className="modal-card-foot">
					<button className="button is-success" onClick={handleEdit}>
						<Icon icon="edit" />
					</button>
					{todo.status !== 1 && (
						<button
							className="button is-danger"
							onClick={handleDelete}
						>
							<Icon icon="trash" />
						</button>
					)}
				</footer>
			</div>
		</div>
	);
}
