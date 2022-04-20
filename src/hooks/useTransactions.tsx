import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { api } from "../Services/api";
interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;

}



interface TransactionInput {
    title: string;
    amount: number;
    type: string;
    category: string;
}
//a interface pode ser trocada por isso daqui também:
//type TransactionInput = Omit<Transaction, 'id' | 'createAt'>;


//fazermos essa interface para declarar que TransactionsContext.Provider  pode receber children 
interface TransactionsProviderProps {
    children: ReactNode;

}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

//forma mais simples de utilizar um context
export const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({children}: TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions)) // pegar esses dados traduzidos e dar um console.log
    }, []); //deixando o colchete [] vazio, o useeffect é chamado apenas uma vez


    async function createTransaction(transactionInput: TransactionInput) {
       const response =  await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date(),
            
       })
       const {transaction} = response.data;


       setTransactions([
           ...transactions,
           transaction,
       ])
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
            
        )

};

export function useTransactions() {
    const context = useContext (TransactionsContext);

    return context;
}
