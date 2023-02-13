const token = (() => {
  const key = 'access_token';

  return {
    get() {
      const value = localStorage.getItem(key);
      return `Bearer ${value}`;
    },
    isExist() {
      const value = localStorage.getItem(key);
      return !!value;
    },
    save(accessToken: string) {
      localStorage.setItem(key, accessToken);
    },
    clear() {
      localStorage.removeItem(key);
    },
  };
})();

export default token;
