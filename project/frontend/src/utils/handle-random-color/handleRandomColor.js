export class handleRandomColor {
    handleRandomColor = () => {
        const arrColors = ['#f50', '#2db7f5', '#87d068', '#108ee9', 'DodgerBlue', 'OrangeRed'];
        return arrColors[Math.floor(Math.random() * arrColors.length)];
    };

    handleRandomColorTag = () => {
        const arrColors = [
            'magenta',
            'red',
            'volcano',
            'orange',
            'gold',
            'lime',
            'green',
            'cyan',
            'blue',
            'geekblue',
            'purple',
        ];
        return arrColors[Math.floor(Math.random() * arrColors.length)];
    };
}
