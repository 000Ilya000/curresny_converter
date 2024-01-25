import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ConverterInputProps from '../ConverterInput/ConverterInput';

// Определение типа для ответа от API
interface ApiResponse {
    data: {
        data: {
            amount: string;
        };
    };
}

// Создание функционального компонента
const CurrencyConverter: React.FC = () => {
    // Состояния для вводимых значений, выбранных валют и даты
    const [value1, setValue1] = useState<string>('1');
    const [value2, setValue2] = useState<string>('');
    const [firstSelected, setFirstSelected] = useState(0);
    const [secondSelected, setSecondSelected] = useState(2);

    // Коды валют
    const currencyCodes = ['BTC', 'USDT', 'ETH'];

    // Получение текущей даты
    const formattedDate = new Date().toLocaleDateString();

    // Обработчик ответа от API
    const handleResponse = (response: ApiResponse) => {
        const { data } = response;
        const parsedValue1 = parseFloat(value1);

        if (data?.data?.amount && !isNaN(parsedValue1)) {
            setValue2((parseFloat(data.data.amount) * parsedValue1).toLocaleString(undefined, {
                minimumFractionDigits: 8,
            }));
            console.log(data.data.amount);
        }
    };

    // Переключение валют
    const handleSwitch = () => {
        setFirstSelected(secondSelected);
        setSecondSelected(firstSelected);
    };

    // Эффект для выполнения запроса к API при изменении состояний
    useEffect(() => {
        axios
            .get(`https://api.coinbase.com/v2/prices/${currencyCodes[firstSelected]}-${currencyCodes[secondSelected]}/buy`)
            .then(handleResponse)
            .catch(error => console.error('Error fetching data:', error));

        // Установка значения по умолчанию, если value1 пусто
        if (!value1.trim()) {
            setValue1('1');
        }
    }, [firstSelected, secondSelected, value1]);

    // Функция для форматирования названия валюты
    const formatCurrency = (index: number) => (index === 0 ? 'BTC' : index === 1 ? 'USDT' : 'ETH');

    return (
        <div className='app_block'>
            <p className='title'>{`Конвертация ${value1} ${formatCurrency(firstSelected)} в ${formatCurrency(secondSelected)}`}</p>
            <p className='subtitle'>{`Конвертер валют актуален на: ${formattedDate}`}</p>
            <div className="mainInputs">
                <ConverterInputProps
                    value={value1}
                    setValue={setValue1}
                    setSelected={setFirstSelected}
                    selectedState={firstSelected}
                    firstInput={true}
                />
                <div className='switcher' onClick={handleSwitch}>
                    {/* Иконка для переключения валют */}
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.551086 0.370483H24.5511V24.3705H0.551086V0.370483Z" fill="white" fillOpacity="0.01" />
                        <path d="M21.5511 9.87048H3.55109" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15.5511 3.87048L21.5511 9.87048" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3.95056 14.8705H21.9506" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3.95056 14.8705L9.95059 20.8705" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <ConverterInputProps
                    value={value2}
                    setValue={setValue2}
                    setSelected={setSecondSelected}
                    selectedState={secondSelected}
                    firstInput={false}
                />
            </div>
        </div>
    );
};

export default CurrencyConverter;