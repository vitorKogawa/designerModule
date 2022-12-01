import React from 'react'
import { IGameCard } from './interfaces/IGameCard'
import { BsPen, BsPlay, BsFillTrashFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { Background } from 'react-flow-renderer';
import './styles/styles.scss'
import Swal from 'sweetalert2';
import { api } from '../../../services/api';

const GameCard: React.FC<IGameCard> = (props) => {
    const history = useHistory();

    const handleClickCard = (gameID: string) => {
        history.push({
            pathname: '/editor',
            search: '?game=' + gameID,
            state: {
                gameID: gameID
            }
        })
    }

    const onRemoveGame = (gameID: string) => {
        return (
            Swal.fire({
                title: 'Você tem certeza que deseja excluir este jogo ?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#F8BA63',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, tenho certeza !'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await api.delete(`game/${gameID}`)
                        .then(() => {
                            Swal.fire(
                                'Jogo removido!',
                                'Seu jogo foi removido com sucesso.',
                                'success'
                            ).finally(() => window.location.reload())
                        })
                        .catch(error => {
                            console.error(error)
                            Swal.fire(
                                'Falha ao remover jogo!',
                                'Falha ao remover jogo, favor tente mais tarde.',
                                'error'
                            )
                        })

                }
            })
        )
    }

    return (
        <div className="card m-2 p-0">
            <div className="img-wrapper">
                <img src={props.imgUrl} className="img-card-top" />
            </div>
            <div className="card-body p-0">
                <div className="card-text-content">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.content}</p>
                </div>
                <div className="card-footer">
                    <a href="#" className="btn btn-edit" onClick={() => handleClickCard(props.gameID)}>
                        <BsPen />
                    </a>
                    <a href="#" className="btn btn-play">
                        <BsPlay />
                    </a>
                    <a href="#" className="btn btn-delete" onClick={() => onRemoveGame(props.gameID)}>
                        <BsFillTrashFill />
                    </a>
                </div>
            </div>
        </div>
    )
}

export { GameCard }