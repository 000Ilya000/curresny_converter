import React from 'react';
import './ConverterInput.css';

// Интерфейс для пропсов компонента
interface ConverterInputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  selectedState: number;
  firstInput: boolean;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}

// Функциональный компонент
const ConverterInput: React.FC<ConverterInputProps> = ({
  value,
  setValue,
  selectedState,
  setSelected,
  firstInput,
}) => {
  // Обработчик изменения ввода
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Фильтрация ввода, оставляя только цифры и точку
    const inputValue = e.target.value.replace(/[^0-9.]/g, '');
    setValue(inputValue);
    console.log(inputValue);
  };

  // Коды валют
  const currencyCodes = ['BTC', 'USDT', 'ETH'];

  // Обработчик изменения выбора валюты
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Определение индекса выбранной валюты
    const selectedIndex = currencyCodes.indexOf(e.target.value);
    setSelected(selectedIndex);
  };

  return (
    <div className='mainInput'>
      {/* Инпут для ввода значения */}
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        disabled={!firstInput}
      />
      {/* Селектор для выбора валюты */}
      <select
        onChange={handleSelectChange}
        value={currencyCodes[selectedState]}
        name="select"
      >
        {/* Опции для каждой валюты */}
        {currencyCodes.map((code, index) => (
          <option key={index} value={code}>
            {code}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ConverterInput;