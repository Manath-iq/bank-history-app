
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
    // Mock data based on the screenshots
    const transactionsByDate = {
        'Сегодня': [
            { icon: 'dodo', title: 'Додо Пицца', category: 'Фастфуд', amount: -419.00, cashback: 20.00 },
            { icon: 'user', title: 'Ульяна К.', category: 'Переводы · СБП · Газпромбанк', amount: 419.00 },
            { icon: 'transfer-self', title: 'Перевод себе в другой банк ч...', category: 'Переводы · СБП · Газпромбанк', amount: -704.86 },
        ],
        '28 октября': [
            { icon: 'transfer-self', title: 'Между своими счетами', category: 'Между своими счетами', amount: 782.00 },
            { icon: 'store', title: 'Находка', category: 'Продукты', amount: -218.00, cashback: 2.00 },
        ],
        'Понедельник, 27 октября': [
            { icon: 'transfer-self', title: 'Между своими счетами', category: 'Между своими счетами', amount: 19.38 },
            { icon: 'onlipay', title: 'OnliPay', category: 'Прочие расходы', amount: -745.11 },
            { icon: 'transfer-self', title: 'Между своими счетами', category: 'Между своими счетами', amount: 400.00 },
            { icon: 'vtb', title: 'Ульяна К.', category: 'Переводы · СБП · Банк ВТБ', amount: 364.49 },
            { icon: 'transfer-self', title: 'Между своими счетами', category: 'Между своими счетами', amount: 588.89 },
        ],
        'Суббота, 25 октября': [
            { icon: 'transfer-self', title: 'Между своими счетами', category: 'Между своими счетами', amount: 21.00 },
            { icon: 'chizhik', title: 'Чижик', category: 'Продукты', amount: -79.00 },
            { icon: 'transfer-self', title: 'Между своими счетами', category: 'Между своими счетами', amount: 100.00 },
            { icon: 'tbank', title: 'Максим Т.', category: 'Переводы · СБП · Т-Банк', amount: 100.00 },
            { icon: 'transport', title: 'Социальная карта РТ', category: 'Транспорт', amount: -40.00 },
            { icon: 'transfer-self', title: 'Между своими счетами', category: 'Между своими счетами', amount: 40.00 },
            { icon: 'transport', title: 'Социальная карта РТ', category: 'Транспорт', amount: -40.00 },
            { icon: 'transfer-self', title: 'Между своими счетами', category: 'Между своими счетами', amount: 40.00 },
        ],
        'Суббота, 18 октября': [
            { icon: 'aliexpress', title: 'AliExpress', category: 'Маркетплейсы', amount: -5783.00, cashback: 57.00 },
            { icon: 'yandex-alice', title: 'Яндекс. Алиса', category: 'Маркетплейсы', amount: -99990.00, details: '1 999,00 ₽' },
            { icon: 'transfer-self', title: 'Между своими счетами', category: 'Между своими счетами', amount: 100000.00 },
            { icon: 'tbank', title: 'Максим Т.', category: 'Переводы · СБП · Т-Банк', amount: 5000.00 },
            { icon: 'transfer-self', title: 'Между своими счетами', category: 'Между своими счетами', amount: 100000.00 },
            { icon: 'atm-deposit', title: 'Внесение средств через уст...', category: 'Внесение наличных', amount: 1000.00 },
            { icon: 'atm-deposit', title: 'Внесение средств через у...', category: 'Внесение наличных', amount: 99000.00 },
            { icon: 'transport', title: 'Социальная карта РТ', category: 'Транспорт', amount: -40.00 },
            { icon: 'transfer-self', title: 'Между своими счетами', category: 'Между своими счетами', amount: 40.00 },
        ],
        'Пятница, 17 октября': [
            { icon: 'transfer-self', title: 'Между своими счетами', category: 'Между своими счетами', amount: 250.00 },
        ]
    };

    const formatCurrency = (amount) => {
        const sign = amount > 0 ? '+' : '';
        const formatted = new Intl.NumberFormat('ru-RU', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Math.abs(amount));
        return `${sign}${formatted.replace(',', '.')}\u00A0₽`;
    };

    const TransactionIcon = ({ icon }) => {
        const icons = {
            dodo: { bg: '#ff6900', content: <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 4C12.95 4 4 12.95 4 24C4 35.05 12.95 44 24 44C35.05 44 44 35.05 44 24C44 12.95 35.05 4 24 4ZM31.27 34.54C30.33 36.31 28.5 37.5 26.5 37.5C24.57 37.5 22.5 36.19 21.5 34.35C20.5 32.5 20.5 30.15 21.5 28.31C22.5 26.47 24.57 25.15 26.5 25.15C28.5 25.15 30.33 26.31 31.27 28.08C32.14 29.74 32.2 32.2 31.27 34.54ZM34.5 23.5C32.5 23.5 31 22 31 20C31 18 32.5 16.5 34.5 16.5C36.5 16.5 38 18 38 20C38 22 36.5 23.5 34.5 23.5Z" fill="white"/></svg> },
            user: { bg: '#4a86e8', content: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> },
            'transfer-self': { bg: '#4a86e8', content: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg> },
            store: { bg: '#34a853', content: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> },
            onlipay: { bg: '#ea4335', content: <span style={{fontSize: '11px', fontWeight: 'bold', color: 'white'}}>131</span> },
            vtb: { bg: '#4a86e8', content: <span style={{fontSize: '11px', fontWeight: 'bold', color: 'white'}}>ВТБ</span> },
            chizhik: { bg: '#fbbc05', content: <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 10C27.9 10 10 27.9 10 50C10 72.1 27.9 90 50 90C72.1 90 90 72.1 90 50C90 27.9 72.1 10 50 10ZM70 52.5C70 61.9 61.9 70 52.5 70C43.1 70 35 61.9 35 52.5C35 43.1 43.1 35 52.5 35C61.9 35 70 43.1 70 52.5Z" fill="black"/><circle cx="52.5" cy="52.5" r="5" fill="white"/></svg> },
            tbank: { bg: '#fbbc05', content: <span style={{fontSize: '18px', fontWeight: 'bold', color: 'black'}}>T</span> },
            transport: { bg: '#34a853', content: <span style={{fontSize: '14px', fontWeight: 'bold', color: 'white'}}>СК</span> },
            aliexpress: { bg: '#ef4b28', content: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 10C17 12.7614 14.7614 15 12 15C9.23858 15 7 12.7614 7 10" stroke="white" strokeWidth="3" strokeLinecap="round"/></svg> },
            'yandex-alice': { bg: '#5f2eea', content: <svg width="32" height="32" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M16 9 C 24 9 26 16 24 23 C 22 25 10 25 8 23 C 6 16 8 9 16 9 Z"/></svg> },
            'atm-deposit': { bg: '#4a86e8', content: <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17 4H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2zm-1 14H8V6h8v12zM10 11h4v2h-4z"/></svg> },
        };
        const current = icons[icon] || { bg: '#3c4043', content: '?' };

        return <div style={{...styles.transactionIcon, backgroundColor: current.bg}}>{current.content}</div>;
    };
    
    // Fix: Explicitly type TransactionItem as a React.FC to allow the use of the 'key' prop without it being part of the component's own props.
    const TransactionItem: React.FC<{ transaction: any }> = ({ transaction }) => (
        <div style={styles.transactionItem}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <TransactionIcon icon={transaction.icon} />
                <div style={{ marginLeft: '16px' }}>
                    <div style={styles.transactionTitle}>{transaction.title}</div>
                    <div style={styles.transactionCategory}>{transaction.category}</div>
                </div>
            </div>
            <div style={{ textAlign: 'right' }}>
                <div style={{...styles.transactionAmount, color: transaction.amount > 0 ? '#34a853' : 'white'}}>
                    {formatCurrency(transaction.amount)}
                </div>
                {transaction.cashback && (
                    <div style={styles.transactionCashback}>{formatCurrency(transaction.cashback)}</div>
                )}
                {transaction.details && (
                    <div style={styles.transactionDetails}>{transaction.details}</div>
                )}
            </div>
        </div>
    );

    return (
        <div style={styles.container}>
            <div style={styles.stickyHeader}>
                <header style={styles.header}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                    <h1 style={styles.title}>История</h1>
                    <div style={styles.headerIcons}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </div>
                </header>
            </div>
            
            <main style={styles.main}>
                <div style={styles.card}>
                    <div style={styles.cardHeader}>
                        <span>Расходы за октябрь</span>
                        <span style={{ fontSize: '20px' }}>&gt;</span>
                    </div>
                    <p style={styles.expenses}>103 846,95 ₽</p>
                    <div style={styles.progressBar}>
                        <div style={{...styles.progressSegment, backgroundColor: '#4285f4', width: '40%'}}></div>
                        <div style={{...styles.progressSegment, backgroundColor: '#ea4335', width: '25%'}}></div>
                        <div style={{...styles.progressSegment, backgroundColor: '#fbbc05', width: '15%'}}></div>
                        <div style={{...styles.progressSegment, backgroundColor: '#34a853', width: '10%'}}></div>
                        <div style={{...styles.progressSegment, backgroundColor: '#9aa0a6', width: '10%'}}></div>
                    </div>
                </div>

                <div style={styles.filters}>
                    <button style={styles.filterButton}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M3 6h18M7 12h10M10 18h4" /></svg></button>
                    <button style={styles.filterButtonActive}>Пополнение</button>
                    <button style={styles.filterButton}>Списание</button>
                    <button style={styles.filterButton}>Месяц</button>
                    <button style={styles.filterButton}>Период</button>
                </div>

                <div style={styles.promoBanner}>
                     <div style={styles.promoIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style={{stopColor:'#ff00ff',stopOpacity:1}} /><stop offset="100%" style={{stopColor:'#00ffff',stopOpacity:1}} /></linearGradient></defs><path fill="url(#grad1)" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15l-1.41-1.41L16.17 10H5v-2h11.17l-5.58-5.59L12 1l7 7-7 7z"/></svg>
                    </div>
                    <p style={styles.promoText}>+1 категория кэшбэка на ноябрь: 5% на фастфуд или любая другая</p>
                    <button style={styles.closeButton}>×</button>
                </div>

                {Object.entries(transactionsByDate).map(([date, transactions]) => (
                    <div key={date}>
                        <h2 style={styles.dateHeader}>{date}</h2>
                        {transactions.map((tx, index) => (
                           <TransactionItem key={index} transaction={tx} />
                        ))}
                    </div>
                ))}
            </main>

            <nav style={styles.bottomNav}>
                <div style={styles.navItem}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#8e8e93"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                    <span>Главный</span>
                </div>
                <div style={styles.navItem}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#8e8e93"><path d="m16.88 2.88-2.62 2.63L12 3 2.01 12.99 12 23l9.99-9.99V3h-5.11zM12 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>
                    <span>Платежи</span>
                </div>
                 <div style={styles.navItem}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#8e8e93"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    <span>Выгода</span>
                </div>
                <div style={styles.navItemActive}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-14H9v6h2V6zm4 0h-2v6h2V6z"/></svg>
                    <span>История</span>
                </div>
                <div style={styles.navItem}>
                    <div style={{position: 'relative'}}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#8e8e93"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
                        <div style={styles.chatBadge}>1</div>
                    </div>
                    <span>Чаты</span>
                </div>
            </nav>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#121212',
        color: '#ffffff',
        fontFamily: "'Roboto', sans-serif",
        minHeight: '100vh',
        paddingBottom: '80px',
    },
    stickyHeader: {
        position: 'sticky',
        top: 0,
        backgroundColor: '#121212',
        zIndex: 10,
        padding: '16px',
        paddingTop: '32px',
        borderBottom: '1px solid #282828'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        margin: 0,
        fontSize: '22px',
        fontWeight: '500',
    },
    headerIcons: {
        display: 'flex',
        gap: '20px',
    },
    main: {
        padding: '0 16px',
    },
    card: {
        backgroundColor: '#1e1e1e',
        borderRadius: '12px',
        padding: '16px',
        margin: '16px 0',
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '14px',
        color: '#b0b0b0',
    },
    expenses: {
        fontSize: '28px',
        fontWeight: 'bold',
        margin: '8px 0',
    },
    progressBar: {
        display: 'flex',
        height: '8px',
        borderRadius: '4px',
        overflow: 'hidden',
        marginTop: '12px',
    },
    progressSegment: {
        height: '100%',
    },
    filters: {
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '10px',
        scrollbarWidth: 'none',
    },
    filterButton: {
        backgroundColor: '#2c2c2e',
        color: 'white',
        border: 'none',
        borderRadius: '18px',
        padding: '8px 16px',
        fontSize: '14px',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
    },
    filterButtonActive: {
        backgroundColor: '#3c3c3e',
        color: 'white',
        border: 'none',
        borderRadius: '18px',
        padding: '8px 16px',
        fontSize: '14px',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
    },
    promoBanner: {
        backgroundColor: '#1e1e1e',
        borderRadius: '12px',
        padding: '12px 16px',
        margin: '16px 0',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    promoIcon: {
        flexShrink: 0
    },
    promoText: {
        fontSize: '14px',
        lineHeight: '1.4',
        margin: 0,
        flexGrow: 1,
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#8e8e93',
        fontSize: '20px',
        cursor: 'pointer',
        padding: 0,
        marginLeft: 'auto'
    },
    dateHeader: {
        fontSize: '16px',
        fontWeight: '500',
        margin: '24px 0 12px 0',
    },
    transactionItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 0',
    },
    transactionIcon: {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
    },
    transactionTitle: {
        fontSize: '16px',
    },
    transactionCategory: {
        fontSize: '13px',
        color: '#8e8e93',
        marginTop: '2px',
    },
    transactionAmount: {
        fontSize: '16px',
        fontWeight: '500',
    },
    transactionCashback: {
        fontSize: '13px',
        color: '#8e8e93',
        marginTop: '2px',
    },
    transactionDetails: {
        fontSize: '13px',
        color: '#8e8e93',
        marginTop: '2px',
    },
    bottomNav: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: '#1e1e1e',
        borderTop: '1px solid #282828',
        padding: '8px 0 16px 0',
    },
    navItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        fontSize: '11px',
        color: '#8e8e93',
        cursor: 'pointer',
    },
    navItemActive: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        fontSize: '11px',
        color: 'white',
        cursor: 'pointer',
    },
    chatBadge: {
        position: 'absolute',
        top: '-4px',
        right: '-8px',
        backgroundColor: '#ef4444',
        color: 'white',
        borderRadius: '50%',
        width: '16px',
        height: '16px',
        fontSize: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #1e1e1e'
    }
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
