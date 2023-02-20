const PatternMatecherHelper = (str) => str && str
    .toString()
    .replace(/[':@;"~.%* +\-?!&#%_=^${}@%()|/[\]\\]/g, '');

export default PatternMatecherHelper;
