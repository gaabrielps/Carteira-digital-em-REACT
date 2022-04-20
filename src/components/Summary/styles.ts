import styled from "styled-components";

export const Container = styled.div`
    display: grid; 
    grid-template-columns: repeat(3, 1fr); //separando em 3 colunas de tamanhos iguais com grid
    gap: 2rem; //espaçamento entre cada grid
    margin-top: -8rem; //ira subir as colunas

    div {
        background: var(--shape);
        padding: 1.5rem 2rem;
        border-radius: 0.25rem;
        color: var(--text-title);
    
        header{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        strong{
            display: block;
            margin-top: 1rem;
            font-size:2rem;
            font-weigh: 500;
            line-height: 3rem;

            &.negative {
                color: var(--red);
            }
        }

        &.highlight-background {
            background: var(--green);
            color: #fff;
        }
    }
`;

