const form = document.getElementById('signUpForm'); 
const user = document.getElementById('user'); 
const email = document.getElementById('email');  
const pass = document.getElementById('password');
const confirm = document.getElementById('confirmPassword'); 
const showPass = document.getElementById('showPassword'); 
const showConfirm = document.getElementById('showConfirmPassword'); 

const userErr = document.getElementById('userErr');
const emailErr = document.getElementById('emailErr');  
const passErr = document.getElementById('passErr');
const confirmErr = document.getElementById('confirmErr');

showPass.addEventListener('click', function () {
    if (pass.type === 'password') {
        pass.type = 'text';
        showPass.src = 'hide.png';
    } else {
        pass.type = 'password';
        showPass.src = 'show.png';
    }
});

showConfirm.addEventListener('click', function () {
    if (confirm.type === 'password') {
        confirm.type = 'text';
        showConfirm.src = 'hide.png';
    } else {
        confirm.type = 'password';
        showConfirm.src = 'show.png';
    }
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    if (user.value.trim() === '') {
        userErr.textContent = 'Username is required';
        userErr.style.visibility = 'visible';
        valid = false;
    } else if (user.value.length < 4) {
        userErr.textContent = 'Username must be at least 4 characters';
        userErr.style.visibility = 'visible';
        valid = false;
    } else {
        userErr.style.visibility = 'hidden';
    }

    if (email.value.trim() === '') {
        emailErr.textContent = 'Email is required';
        emailErr.style.visibility = 'visible';
        valid = false;
    } else if (!hasValidEmail(email.value)) {
        emailErr.textContent = 'Please enter a valid email address';
        emailErr.style.visibility = 'visible';
        valid = false;
    } else {
        emailErr.style.visibility = 'hidden';
    }

    passErr.innerHTML = '';
    if (pass.value.length < 6) {
        passErr.innerHTML += 'Password must be at least 6 characters<br>';
        valid = false;
    } 
    if (!hasLetterAndNumber(pass.value)) {
        passErr.innerHTML += 'Password must contain both letters and numbers<br>';
        valid = false;
    } 
    if (!hasUpperCase(pass.value)) {
        passErr.innerHTML += 'Password must contain at least one uppercase letter<br>';
        valid = false;
    } 
    if (!hasLowerCase(pass.value)) {
        passErr.innerHTML += 'Password must contain at least one lowercase letter<br>';
        valid = false;
    } 
    if (!hasSpecialChar(pass.value)) {
        passErr.innerHTML += 'Password must contain at least one special character<br>';
        valid = false;
    } 
    if (passErr.innerHTML !== '') {
        passErr.style.visibility = 'visible';
    } else {
        passErr.style.visibility = 'hidden';
    }

    if (confirm.value !== pass.value) {
        confirmErr.textContent = 'Passwords do not match';
        confirmErr.style.visibility = 'visible';
        valid = false;
    } else {
        confirmErr.style.visibility = 'hidden';
    }

    if (valid) {
        alert('Form submitted!');
    }
});

function hasLetterAndNumber(pw) {
    let hasLetter = false;
    let hasNumber = false;

    for (let i = 0; i < pw.length; i++) {
        let charCode = pw.charCodeAt(i);
        if (charCode >= 48 && charCode <= 57) {
            hasNumber = true;
        } else if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
            hasLetter = true;
        }
    }

    return hasLetter && hasNumber; 
}

function hasUpperCase(pw) {
    for (let i = 0; i < pw.length; i++) {
        let charCode = pw.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            return true;
        }
    }
    return false;
}

function hasLowerCase(pw) {
    for (let i = 0; i < pw.length; i++) {
        let charCode = pw.charCodeAt(i);
        if (charCode >= 97 && charCode <= 122) {
            return true;
        }
    }
    return false;
}

function hasSpecialChar(pw) {
    const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '{', '}', '[', ']', '|', ':', ';', '"', '\'', '<', '>', ',', '.', '?', '/', '~', '`'];
    for (let i = 0; i < pw.length; i++) {
        if (specialChars.indexOf(pw[i]) !== -1) {
            return true;
        }
    }
    return false;
}

function hasValidEmail(email) {
    const atIndex = email.indexOf('@');
    const dotIndex = email.indexOf('.', atIndex);
    return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < email.length - 1;
}
