interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return <div className="text-red-500">{message}</div>;
};

export default ErrorMessage;
