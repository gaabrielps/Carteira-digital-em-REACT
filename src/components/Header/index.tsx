
import logo from '../../Assets/logo.svg'
import { Container, Content } from './styles'

interface HeaderProps {
    onOpenNewTransactionModal: () => void;
}

export function Header ({onOpenNewTransactionModal}: HeaderProps) {
    return (

       <Container>
           <Content>
            <img src={logo} alt="logo" />
           <button type="button" onClick={onOpenNewTransactionModal}> 
               Nova transação
           </button> 
           </Content>
       </Container>
    )
    
}