import Modal from 'react-modal';
import {Container, TransactionTypeContainer, RadioBox} from './style'
import close from '../../Assets/fechar.svg'
import saida from '../../Assets/Saídas.svg'
import entrada from '../../Assets/Entradas.svg'
import { FormEvent, useState} from 'react';
import { useTransactions } from '../../hooks/useTransactions';


interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void; //não irá retornar nada
}


export function NewTransactionModal ({isOpen, onRequestClose}: NewTransactionModalProps){
    const {createTransaction} = useTransactions();

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit') // estado para armazenar o botaão escolhido. De entrada ou saida.

    async function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type,
        })


        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit')
        onRequestClose();
    
    }

        

    return (
        <Modal
         
        onRequestClose={onRequestClose} //para fechar quando clicarmos ESC ou clickar do lado de fora do modal
        isOpen={isOpen}
        overlayClassName= "react-modal-overlay" // classe pronta do react-modal
        className="react-modal-content" // classe pronta do react-modal
        // irá ser estilizada no global.ts
        >

        <button 
        type='button'
        onClick={onRequestClose}
        className="react-modal-close"
        >
            <img src={close} alt="travaNaPoseChamaNoZoomDaUmCLOSEoooh" />
            
        </button>
        
        <Container onSubmit={handleCreateNewTransaction}>
            <h2>cadastrar transação</h2>

            <input 
            placeholder='Titulo'
            value={title}
            onChange={event => setTitle(event.target.value)}
            />

            <input 
            type="number"
            placeholder='Valor'
            value={amount}
            onChange={event => setAmount(Number(event.target.value))}

            />

        <TransactionTypeContainer>
            <RadioBox
                type='button'
                onClick={() => {setType('deposit')}} // ativar o estado de deposito quando for clikado
                isActive={type === 'deposit'}
                activeColor= "green"    
  
            >
                <img src={entrada} alt="entrada" />
                <span>Entradas</span>
            </RadioBox>
            <RadioBox
                type='button'
                onClick={() => {setType('withdraw')}} // ativar o estado de saida quando for clikado 
                isActive={type === 'withdraw'}  
                activeColor= "red"    
        
            >
                <img src={saida} alt="saida" />
                <span>Saida</span>
                
            </RadioBox>

        </TransactionTypeContainer>

            <input 
            placeholder='Categoria'
            value={category}
            onChange={event => setCategory(event.target.value)}
            />

          <button type="submit">
              Cadastrar
          </button>


        </Container>
          
         
         </Modal> 

    )
}