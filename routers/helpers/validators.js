

function check_password(password) {
      return password.length <= 6 || password.length >= 14
}

module.exports = {check_password}