import Cookies from 'js-cookie';

// Функция проверки наличия токена
export function isTokenExists(): boolean {
  return !!Cookies.get('accessToken');
}
