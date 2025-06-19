// Dynamic UI functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initializeTheme();
    
    // Initialize account cards
    initializeAccountCards();
    
    // Initialize notifications
    initializeNotifications();
    
    // Initialize real-time balance updates
    initializeBalanceUpdates();

    // Initialize quick actions
    initializeQuickActions();

    // Load transactions when the page loads
    loadTransactions();
});

// Theme functionality
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeText = document.getElementById('themeText');
    
    // Set initial theme
    updateThemeDisplay();

    themeToggle.addEventListener('click', function() {
        const currentTheme = sessionStorage.getItem('theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        sessionStorage.setItem('theme', newTheme);
        document.body.className = newTheme;
        updateThemeDisplay();
    });

    function updateThemeDisplay() {
        const currentTheme = sessionStorage.getItem('theme');
        themeText.textContent = currentTheme === 'light' ? 'Light Mode' : 'Dark Mode';
        themeToggle.innerHTML = currentTheme === 'light' 
            ? '<i class="fas fa-moon"></i><span>Dark Mode</span>'
            : '<i class="fas fa-sun"></i><span>Light Mode</span>';
    }
}

// Account cards functionality
function initializeAccountCards() {
    const accountsList = document.getElementById('accountsList');
    if (!accountsList) return;

    // Add hover effects to account cards
    const accountCards = document.querySelectorAll('.account-card');
    accountCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    // Add click effects to action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.textContent.trim();
            handleActionClick(action, this.closest('.account-card'));
        });
    });
}

// Handle action button clicks
function handleActionClick(action, card) {
    const accountNumber = card.querySelector('.account-number').textContent;
    
    switch(action) {
        case 'Transfer':
            showTransferModal(accountNumber);
            break;
        case 'Statement':
            showStatementModal(accountNumber);
            break;
    }
}

// Show transfer modal
function showTransferModal(accountNumber) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Transfer Money</h2>
            <form id="transferForm">
                <div class="form-group">
                    <label>From Account</label>
                    <input type="text" value="${accountNumber}" readonly>
                </div>
                <div class="form-group">
                    <label>To Account</label>
                    <input type="text" placeholder="Enter recipient account number" required>
                </div>
                <div class="form-group">
                    <label>Amount</label>
                    <input type="number" placeholder="Enter amount" required>
                </div>
                <div class="form-actions">
                    <button type="submit" class="submit-btn">Transfer</button>
                    <button type="button" class="cancel-btn" onclick="closeModal()">Cancel</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

// Show statement modal
function showStatementModal(accountNumber) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Account Statement</h2>
            <div class="statement-content">
                <div class="statement-header">
                    <span>Account: ${accountNumber}</span>
                    <span>Date: ${new Date().toLocaleDateString()}</span>
                </div>
                <div class="statement-transactions">
                    <!-- Sample transactions -->
                    <div class="transaction">
                        <span class="date">2024-03-20</span>
                        <span class="description">Salary Deposit</span>
                        <span class="amount credit">+$3,500.00</span>
                    </div>
                    <div class="transaction">
                        <span class="date">2024-03-19</span>
                        <span class="description">Grocery Store</span>
                        <span class="amount debit">-$45.00</span>
                    </div>
                </div>
            </div>
            <button class="cancel-btn" onclick="closeModal()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

// Initialize notifications
function initializeNotifications() {
    const notificationBell = document.querySelector('.fa-bell');
    if (!notificationBell) return;

    notificationBell.addEventListener('click', function() {
        showNotifications();
    });
}

// Show notifications
function showNotifications() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Notifications</h2>
            <div class="notifications-list">
                <div class="notification">
                    <i class="fas fa-info-circle"></i>
                    <div class="notification-content">
                        <h3>New Transaction</h3>
                        <p>Your salary has been deposited</p>
                        <span class="time">2 hours ago</span>
                    </div>
                </div>
                <div class="notification">
                    <i class="fas fa-exclamation-circle"></i>
                    <div class="notification-content">
                        <h3>Security Alert</h3>
                        <p>New login detected from a new device</p>
                        <span class="time">1 day ago</span>
                    </div>
                </div>
            </div>
            <button class="cancel-btn" onclick="closeModal()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

// Initialize real-time balance updates
function initializeBalanceUpdates() {
    const balanceElements = document.querySelectorAll('.account-balance h1');
    if (!balanceElements.length) return;

    // Simulate real-time balance updates
    setInterval(() => {
        balanceElements.forEach(balance => {
            const currentBalance = parseFloat(balance.textContent.replace('₹', '').replace(',', ''));
            const randomChange = (Math.random() - 0.5) * 100;
            const newBalance = currentBalance + randomChange;
            balance.textContent = `₹${newBalance.toFixed(2)}`;
            
            // Add animation class
            balance.classList.add('balance-update');
            setTimeout(() => {
                balance.classList.remove('balance-update');
            }, 1000);
        });
    }, 5000);
}

// Quick Actions functionality
function initializeQuickActions() {
    const actionButtons = document.querySelectorAll('.action-buttons .action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            handleQuickAction(action);
        });
    });
}

function handleQuickAction(action) {
    switch(action) {
        case 'Transfer':
            showQuickTransferModal();
            break;
        case 'Deposit':
            showDepositModal();
            break;
        case 'Pay Bills':
            showPayBillsModal();
            break;
        case 'History':
            showTransactionHistory();
            break;
    }
}

function showQuickTransferModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Quick Transfer</h2>
            <form id="quickTransferForm">
                <div class="form-group">
                    <label>From Account</label>
                    <select id="fromAccount" required>
                        <option value="">Select Account</option>
                        <option value="****1234">Savings Account (****1234)</option>
                        <option value="****5678">Checking Account (****5678)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>To Account</label>
                    <select id="toAccount" required>
                        <option value="">Select Account</option>
                        <option value="****1234">Savings Account (****1234)</option>
                        <option value="****5678">Checking Account (****5678)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Amount (₹)</label>
                    <input type="number" min="0" step="0.01" placeholder="Enter amount in INR" required>
                </div>
                <div class="form-actions">
                    <button type="submit" class="submit-btn">Transfer</button>
                    <button type="button" class="cancel-btn" onclick="closeModal()">Cancel</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';

    // Add form submission handler
    const form = document.getElementById('quickTransferForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const fromAccount = document.getElementById('fromAccount').value;
        const toAccount = document.getElementById('toAccount').value;
        const amount = this.querySelector('input[type="number"]').value;

        if (!fromAccount || !toAccount || !amount) {
            showNotification('Transfer Failed', 'Please fill in all fields');
            return;
        }

        if (fromAccount === toAccount) {
            showNotification('Transfer Failed', 'Cannot transfer to the same account');
            return;
        }

        if (parseFloat(amount) <= 0) {
            showNotification('Transfer Failed', 'Amount must be greater than 0');
            return;
        }

        // Simulate transfer
        simulateTransfer(fromAccount, toAccount, amount);
        closeModal();
    });
}

function showDepositModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Deposit Money</h2>
            <form id="depositForm">
                <div class="form-group">
                    <label>To Account</label>
                    <select id="depositAccount" required>
                        <option value="">Select Account</option>
                        <option value="****1234">Savings Account (****1234)</option>
                        <option value="****5678">Checking Account (****5678)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Amount (₹)</label>
                    <input type="number" min="0.01" step="0.01" placeholder="Enter amount in INR" required>
                </div>
                <div class="form-actions">
                    <button type="submit" class="submit-btn">Deposit</button>
                    <button type="button" class="cancel-btn" onclick="closeModal()">Cancel</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';

    // Add form submission handler
    const form = document.getElementById('depositForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const account = document.getElementById('depositAccount').value;
        const amount = this.querySelector('input[type="number"]').value;

        if (!account || !amount) {
            showNotification('Deposit Failed', 'Please fill in all fields');
            return;
        }

        if (parseFloat(amount) <= 0) {
            showNotification('Deposit Failed', 'Amount must be greater than 0');
            return;
        }

        // Process deposit with exact amount
        processDeposit(account, amount);
        closeModal();
    });
}

function processDeposit(account, amount) {
    const accountCards = document.querySelectorAll('.account-card');
    let targetBalance = null;

    accountCards.forEach(card => {
        const accountNumber = card.querySelector('.account-number').textContent;
        if (accountNumber === account) {
            targetBalance = card.querySelector('.account-balance h1');
        }
    });

    if (targetBalance) {
        const currentBalance = parseFloat(targetBalance.textContent.replace('₹', '').replace(',', ''));
        const depositAmount = parseFloat(amount);
        
        // Validate deposit amount
        if (depositAmount <= 0) {
            showNotification('Deposit Failed', 'Deposit amount must be greater than 0');
            return;
        }

        // Update balance with exact deposit amount
        const newBalance = (currentBalance + depositAmount).toFixed(2);
        targetBalance.textContent = `₹${newBalance}`;
        
        // Add to transaction history with exact amount
        addTransactionToHistory('Deposit', account, depositAmount, 'credit');
        
        // Show success notification with exact amount
        showNotification('Deposit Successful', `Successfully deposited ₹${depositAmount.toFixed(2)} to ${account}`);
    }
}

function showPayBillsModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Pay Bills</h2>
            <form id="payBillsForm">
                <div class="form-group">
                    <label>From Account</label>
                    <select id="billAccount" required>
                        <option value="">Select Account</option>
                        <option value="****1234">Savings Account (****1234)</option>
                        <option value="****5678">Checking Account (****5678)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Bill Type</label>
                    <select id="billType" required>
                        <option value="">Select Bill Type</option>
                        <option value="electricity">Electricity</option>
                        <option value="water">Water</option>
                        <option value="gas">Gas</option>
                        <option value="internet">Internet</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Amount (₹)</label>
                    <input type="number" min="0" step="0.01" placeholder="Enter amount in INR" required>
                </div>
                <div class="form-actions">
                    <button type="submit" class="submit-btn">Pay Bill</button>
                    <button type="button" class="cancel-btn" onclick="closeModal()">Cancel</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';

    // Add form submission handler
    const form = document.getElementById('payBillsForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const account = document.getElementById('billAccount').value;
        const billType = document.getElementById('billType').value;
        const amount = this.querySelector('input[type="number"]').value;

        if (!account || !billType || !amount) {
            showNotification('Payment Failed', 'Please fill in all fields');
            return;
        }

        if (parseFloat(amount) <= 0) {
            showNotification('Payment Failed', 'Amount must be greater than 0');
            return;
        }

        // Process bill payment
        processBillPayment(account, billType, amount);
        closeModal();
    });
}

function processBillPayment(account, billType, amount) {
    const accountCards = document.querySelectorAll('.account-card');
    let sourceBalance = null;

    accountCards.forEach(card => {
        const accountNumber = card.querySelector('.account-number').textContent;
        if (accountNumber === account) {
            sourceBalance = card.querySelector('.account-balance h1');
        }
    });

    if (sourceBalance) {
        const currentBalance = parseFloat(sourceBalance.textContent.replace('₹', '').replace(',', ''));
        const paymentAmount = parseFloat(amount);

        if (currentBalance >= paymentAmount) {
            const newBalance = (currentBalance - paymentAmount).toFixed(2);
            sourceBalance.textContent = `₹${newBalance}`;
            
            // Add to transaction history
            addTransactionToHistory('Bill Payment', account, paymentAmount, 'debit', billType);
            
            // Show success notification
            showNotification('Payment Successful', `Successfully paid ₹${paymentAmount} for ${billType} bill`);
        } else {
            showNotification('Payment Failed', 'Insufficient funds for payment');
        }
    }
}

function showTransactionHistory() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Transaction History</h2>
            <div class="statement-content">
                <div class="statement-header">
                    <span>Date Range: Last 30 Days</span>
                </div>
                <div class="statement-transactions">
                    <div class="transaction">
                        <span class="date">2024-03-20</span>
                        <span class="description">Transfer to Checking</span>
                        <span class="amount debit">-$500.00</span>
                    </div>
                    <div class="transaction">
                        <span class="date">2024-03-19</span>
                        <span class="description">Salary Deposit</span>
                        <span class="amount credit">+$3,500.00</span>
                    </div>
                    <div class="transaction">
                        <span class="date">2024-03-18</span>
                        <span class="description">Electric Bill Payment</span>
                        <span class="amount debit">-$120.00</span>
                    </div>
                </div>
            </div>
            <button class="cancel-btn" onclick="closeModal()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

function simulateTransfer(fromAccount, toAccount, amount) {
    const accountCards = document.querySelectorAll('.account-card');
    let fromBalance = null;
    let toBalance = null;

    accountCards.forEach(card => {
        const accountNumber = card.querySelector('.account-number').textContent;
        if (accountNumber === fromAccount) {
            fromBalance = card.querySelector('.account-balance h1');
        }
        if (accountNumber === toAccount) {
            toBalance = card.querySelector('.account-balance h1');
        }
    });

    if (fromBalance && toBalance) {
        const fromAmount = parseFloat(fromBalance.textContent.replace('₹', '').replace(',', ''));
        const toAmount = parseFloat(toBalance.textContent.replace('₹', '').replace(',', ''));
        const transferAmount = parseFloat(amount);

        if (fromAmount >= transferAmount) {
            const newFromBalance = (fromAmount - transferAmount).toFixed(2);
            const newToBalance = (toAmount + transferAmount).toFixed(2);
            
            fromBalance.textContent = `₹${newFromBalance}`;
            toBalance.textContent = `₹${newToBalance}`;
            
            // Add transaction to history for both accounts
            addTransactionToHistory('Transfer', fromAccount, transferAmount, 'debit', `To: ${toAccount}`);
            addTransactionToHistory('Transfer', toAccount, transferAmount, 'credit', `From: ${fromAccount}`);
            
            showNotification('Transfer Successful', `Successfully transferred ₹${transferAmount} from ${fromAccount} to ${toAccount}`);
        } else {
            showNotification('Transfer Failed', 'Insufficient funds for transfer');
        }
    }
}

// Function to add transaction to history
function addTransactionToHistory(type, account, amount, transactionType, description = '') {
    const transactionList = document.querySelector('.transaction-list');
    if (!transactionList) return;

    const transaction = document.createElement('div');
    transaction.className = 'transaction';
    
    const date = new Date();
    const formattedDate = `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
    
    let icon = 'fa-exchange-alt';
    let color = 'debit';
    
    if (type === 'Deposit') {
        icon = 'fa-money-bill-wave';
        color = 'credit';
    } else if (type === 'Bill Payment') {
        icon = 'fa-utilities';
    } else if (type === 'Transfer' && transactionType === 'credit') {
        color = 'credit';
    }
    
    transaction.innerHTML = `
        <div class="transaction-info">
            <i class="fas ${icon}"></i>
            <div>
                <h3>${type}</h3>
                <p>${formattedDate}</p>
                ${description ? `<p>${description}</p>` : ''}
            </div>
        </div>
        <span class="amount ${color}">${transactionType === 'credit' ? '+' : '-'}₹${amount.toFixed(2)}</span>
    `;
    
    // Add the new transaction at the top of the list
    transactionList.insertBefore(transaction, transactionList.firstChild);
    
    // Limit the number of visible transactions to 5
    const transactions = transactionList.querySelectorAll('.transaction');
    if (transactions.length > 5) {
        transactionList.removeChild(transactions[transactions.length - 1]);
    }

    // Store transaction in session storage
    storeTransaction(type, account, amount, transactionType, description, formattedDate);
}

// Function to store transaction in session storage
function storeTransaction(type, account, amount, transactionType, description, date) {
    let transactions = JSON.parse(sessionStorage.getItem('transactions') || '[]');
    transactions.unshift({
        type,
        account,
        amount,
        transactionType,
        description,
        date
    });
    
    // Keep only the last 20 transactions
    if (transactions.length > 20) {
        transactions = transactions.slice(0, 20);
    }
    
    sessionStorage.setItem('transactions', JSON.stringify(transactions));
}

// Function to load transactions from session storage
function loadTransactions() {
    const transactionList = document.querySelector('.transaction-list');
    if (!transactionList) return;

    const transactions = JSON.parse(sessionStorage.getItem('transactions') || '[]');
    
    // Clear existing transactions
    transactionList.innerHTML = '';
    
    // Add transactions to the list
    transactions.forEach(transaction => {
        const transactionElement = document.createElement('div');
        transactionElement.className = 'transaction';
        
        let icon = 'fa-exchange-alt';
        let color = 'debit';
        
        if (transaction.type === 'Deposit') {
            icon = 'fa-money-bill-wave';
            color = 'credit';
        } else if (transaction.type === 'Bill Payment') {
            icon = 'fa-utilities';
        } else if (transaction.type === 'Transfer' && transaction.transactionType === 'credit') {
            color = 'credit';
        }
        
        transactionElement.innerHTML = `
            <div class="transaction-info">
                <i class="fas ${icon}"></i>
                <div>
                    <h3>${transaction.type}</h3>
                    <p>${transaction.date}</p>
                    ${transaction.description ? `<p>${transaction.description}</p>` : ''}
                </div>
            </div>
            <span class="amount ${color}">${transaction.transactionType === 'credit' ? '+' : '-'}₹${transaction.amount.toFixed(2)}</span>
        `;
        
        transactionList.appendChild(transactionElement);
    });
}

function showNotification(title, message) {
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    if (title.includes('Failed')) {
        notification.classList.add('error');
    } else {
        notification.classList.add('success');
    }
    notification.innerHTML = `
        <div class="notification-content">
            <h3>${title}</h3>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
} 