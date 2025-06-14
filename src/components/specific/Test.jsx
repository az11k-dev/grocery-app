const Test = () => {
    window.onTelegramAuth = (user) => {
        console.log("User info from Telegram:", user);
        alert(`Hello, ${user.first_name}!`);
    };

    return (
        <div className="p-10">
            <script
                async
                src="https://telegram.org/js/telegram-widget.js?7"
                data-telegram-login="grocery_appbot"
                data-size="large"
                data-userpic="true"
                data-request-access="write"
                data-onauth="onTelegramAuth(user)"
            />
        </div>
    );
};
export default Test;