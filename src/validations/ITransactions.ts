export interface ISessionIdProps {
  sessionId: string;
}

export interface IListTransactionProps extends ISessionIdProps {
  id: string;
}

export interface ICreateTransactionProp extends ISessionIdProps {
    
}