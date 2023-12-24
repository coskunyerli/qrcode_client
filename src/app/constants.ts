export class AppSettings {
    public static BASE_URL: string = 'http://192.168.1.11:8000';
    public static ACCOUNT_PATH = '/account'
}

export class InfoMessage {
    public static loginInfo = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at semper massa, sit amet molestie velit. Phasellus imperdiet nulla eu molestie vulputate. Maecenas pharetra velit facilisis diam mollis pretium. Vivamus gravida augue et nibh viverra, id imperdiet ipsum volutpat. In metus leo, malesuada sit amet lacinia sed, eleifend id arcu. Nullam efficitur nec lectus vel lacinia. Donec a justo eget sapien convallis iaculis quis ut nisl. Fusce vel felis quis ligula maximus finibus sed eget neque."
    public static registerQRNameInfo = "Duis arcu tellus, accumsan eu euismod et, blandit quis sapien. Phasellus aliquet, mi a faucibus eleifend, lectus est tristique quam, vitae tristique lorem dolor in urna. Aenean at dolor ac ligula placerat mattis quis non quam. "
    public static registerQRMessageInfo = "Curabitur rutrum purus id venenatis dictum. Aenean posuere eleifend porta. Aenean non cursus arcu, eget tristique tortor. In fringilla eros orci, et fermentum nunc lacinia at. Aenean dapibus tortor sit amet lacus vulputate luctus. Donec lacus elit, sodales ac orci at, placerat condimentum enim."
    public static founderContactInfo = "Curabitur rutrum purus id venenatis dictum. Aenean posuere eleifend porta. Aenean non cursus arcu, eget tristique tortor. In fringilla eros orci, et fermentum nunc lacinia at. Aenean dapibus tortor sit amet lacus vulputate luctus. Donec lacus elit, sodales ac orci at, placerat condimentum enim."
    public static founderMessageInfo = "Curabitur rutrum purus id venenatis dictum. Aenean posuere eleifend porta. Aenean non cursus arcu, eget tristique tortor. In fringilla eros orci, et fermentum nunc lacinia at. Aenean dapibus tortor sit amet lacus vulputate luctus. Donec lacus elit, sodales ac orci at, placerat condimentum enim."
    public static accountQRNameInfo = InfoMessage.registerQRNameInfo
    public static accountQRMessageInfo = InfoMessage.registerQRNameInfo
    public static accountQRVisibilityInfo = InfoMessage.registerQRNameInfo
}