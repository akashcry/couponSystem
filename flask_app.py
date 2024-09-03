from flask import Flask, request, jsonify

app = Flask(__name__)

# In-memory database to store coupon codes and associated MAC addresses
coupon_database = {
    "COUPON123": None,  # Example coupon with no MAC address linked yet
    "COUPON456": "00:1B:44:11:3A:B7",  # Example coupon already linked to a MAC address
}

@app.route('/validate_coupon', methods=['POST'])
def validate_coupon():
    data = request.json
    coupon_code = data.get('coupon_code')
    mac_address = data.get('mac_address')

    if coupon_code not in coupon_database:
        return jsonify({"success": False, "message": "Invalid coupon code"}), 400

    stored_mac = coupon_database[coupon_code]

    if stored_mac is None:
        # Register the MAC address to this coupon
        coupon_database[coupon_code] = mac_address
        return jsonify({"success": True, "message": "Coupon validated and registered"}), 200

    if stored_mac == mac_address:
        return jsonify({"success": True, "message": "Coupon validated"}), 200
    else:
        return jsonify({"success": False, "message": "Coupon already linked to another device"}), 400

if __name__ == '__main__':
    app.run()
