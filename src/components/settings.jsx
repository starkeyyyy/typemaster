import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeContext';
import './settings.css';
import { ReactComponent as Down } from './svg/chevron-down-solid.svg';

export default function Settings() {
  const { changeTheme } = useTheme();
  const [selected, setSelected] = useState(() => {
    // Initialize state from localStorage or default to 0
    const savedSelected = localStorage.getItem('selectedCaret');
    //return savedSelected ? JSON.parse(savedSelected) : 1;
    return 1;
  });
  const [style, setStyle] = useState(() => {
    // Initialize state from localStorage or default to 0
    const savedStyle = localStorage.getItem('selectedStyle');
    //return savedStyle ? JSON.parse(savedStyle) : 2;
    return 2;

  });

  // Define caret style functions
  const carretstyle = (line, downline, topline, rightline, opacity) => {
    document.documentElement.style.setProperty('--border-left', line);
    document.documentElement.style.setProperty('--border-down', downline);
    document.documentElement.style.setProperty('--border-top', topline);
    document.documentElement.style.setProperty('--border-right', rightline);
    document.documentElement.style.setProperty('--opacity', opacity);
  };

  const carretspeed = (pace) => {
    document.documentElement.style.setProperty('--transition', pace);
  };

  // Apply the selected caret style on mount
  useEffect(() => {
    switch (selected) {
      case 1:
        carretstyle('3px solid var(--color-heading)', 'none', 'none', 'none', 'none');
        break;
      case 2:
        carretstyle('none', '3px solid var(--color-heading)', 'none', 'none', 'none');
        break;
      case 3:
        carretstyle('16.5px solid var(--color-heading)', 'none', 'none', 'none', '30%');
        break;
      case 4:
        carretstyle('2px solid var(--color-heading)', '2px solid var(--color-heading)', '2px solid var(--color-heading)', '2px solid var(--color-heading)', 'none');
        break;
      case 5:
        carretstyle('none');
        break;
      default:
        break;
    }
  }, [selected]);

  // Apply the selected caret speed on mount
  useEffect(() => {
    switch (style) {
      case 1:
        carretspeed('all 0.3s ease');
        break;
      case 2:
        carretspeed('all 0.2s ease');
        break;
      case 3:
        carretspeed('all 0.1s ease');
        break;
      case 4:
        carretspeed('none');
        break;
      default:
        break;
    }
  }, [style]);

  // Save selected state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedCaret', JSON.stringify(selected));
    localStorage.setItem('selectedStyle', JSON.stringify(style));
  }, [selected, style]);

  return (
    <div>
      <div className='theme'>
        <h2 className='h2'>Themes <Down /></h2>
        <div className='themes'>
        <button className="beautiful-button light-theme-button" onClick={() => changeTheme("#EBE3CB", "#A49C94", "#9CBCCC")}>Light Theme</button>
        <button className="beautiful-button paper-theme-button" onClick={() => changeTheme("#EBEBEB", "#BCBCBC", "#4E4E4E")}>paper</button>
        <button className="beautiful-button coffee-theme-button" onClick={() => changeTheme("#f9f8eb","#bf8f5e","#523a28" )}>Coffee</button>
        <button className="beautiful-button forest-theme-button" onClick={() => changeTheme("#04242C", "#749194", "#F1D469")}>Forest Theme</button>
        <button className="beautiful-button milk-shake-button" onClick={() => changeTheme("#EBEBEB", "#64CCE4", "#242C44")}>MilkShake</button>
        <button className="beautiful-button pastel-theme-button" onClick={() => changeTheme("#CCBFAC", "#D73A87", "#543A40")}>Sunset Theme</button>
        <button className="beautiful-button dark-dragon-button" onClick={() => changeTheme("#2C2425", "#DFA129", "#464646")}>Sunset Glow</button>
        <button className="beautiful-button calm-button" onClick={() => changeTheme("#1C1C1C", "#7C7C7C", "#047CCC")}>Forest Whisper</button>
        <button className="beautiful-button joyfull-button" onClick={() => changeTheme("#241C64", "#E8C384", "#DDDBE6")}>Ocean Breeze</button>
        <button className="beautiful-button autumn-harvest" onClick={() => changeTheme("#747474", "#A5A5A5", "#292929")}>Autumn Harvest</button>
        <button className="beautiful-button dark-pastel" onClick={() => changeTheme("#1C1C1C", "#3F3132", "#A48474")}>Soft Pastels</button>
        </div>

        <h2 className='h2'>Caret <Down /></h2>
        <div className='caret-style'>
          <h3>Select the caret style that you want:</h3>
          <span>
            <button className={`caret-button`} style={selected === 1 ? { backgroundColor: 'var(--color-text)' } : {}} onClick={() =>  setSelected(1)}>▏</button>
            <button className={`caret-button`} style={selected === 2 ? { backgroundColor: 'var(--color-text)' } : {}} onClick={() =>  setSelected(2)}>▬</button>
            <button className={`caret-button`} style={selected === 3 ? { backgroundColor: 'var(--color-text)' } : {}} onClick={() => setSelected(3)}>▋</button>
            <button className={`caret-button`} style={selected === 4 ? { backgroundColor: 'var(--color-text)' } : {}} onClick={() =>  setSelected(4)}>▯</button>
            <button className={`caret-button`} style={selected === 5 ? { backgroundColor: 'var(--color-text)' } : {}} onClick={() =>  setSelected(5)}>off</button>
          </span>
        </div>
        <div className='caret-style'>
          <h3>Select the caret smoothness:</h3>
          <span>
            <button className='caret-button' style={style === 1 ? { backgroundColor: 'var(--color-text)' } : {}} onClick={() =>setStyle(1)}>slow</button>
            <button className='caret-button' style={style === 2 ? { backgroundColor: 'var(--color-text)' } : {}} onClick={() =>setStyle(2)}>medium</button>
            <button className='caret-button' style={style === 3 ? { backgroundColor: 'var(--color-text)' } : {}} onClick={() =>setStyle(3)}>high</button>
            <button className='caret-button' style={style === 4 ? { backgroundColor: 'var(--color-text)' } : {}} onClick={() =>setStyle(4)}>off</button>
          </span>
        </div>
        
      </div>
    </div>
  );
}

