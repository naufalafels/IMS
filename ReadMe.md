# Warehouse/Inventory Management System

This project is a simple but powerful Warehouse/Inventory Management System designed to help track items entering and leaving a warehouse. It provides functionalities for technicians to check in items, engineers to check out items, and administrators to manage inventory levels.

## Features

* **Item Check-in:** Technicians can add new items to the inventory, including details such as:
    * Arrival Date
    * Item Description
    * Manufacturer ID
    * Item Type (dropdown menu: Screws, PVC Pipes, Fans, GM tube, etc.)
    * Quantity
    * SKU
    * Batch Lot
    * Supplier
    * Unit Cost
    * Expiry Date
    * Dimensions/Weight
* **Unique ID / SKU Generation:** Each item record in the inventory is assigned a unique ID for tracking.
* **Location Management:** Items can be assigned to specific locations within the warehouse, using a classification system (e.g., GF-C1-R1 for Ground Floor - Cabinet 1 - Row 1).
* **Inventory Display:** A page displays all items in the warehouse with important details (Date in, Item Description, Item Type, SKU, Batch Lot, Location).
* **Search and Filtering:** Users can easily search and filter items based on various criteria.
* **Item Check-out:** Engineers can check out items from the inventory, recording the quantity and transaction details.
* **Low Stock Notifications:** The system sends notifications (pop-up and email) when an item's quantity is low, prompting reordering.
* **User Authentication:** User accounts with different roles (technician, engineer, admin).
* **Transaction History:** Logs all item check-in and check-out transactions.

## Technology Stack

* **Backend:** Python (Flask)
* **Database:** SQLite (or PostgreSQL for larger scale)
* **Frontend:** HTML, CSS, JavaScript

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd <project_directory>
    ```

3.  **Create a virtual environment (recommended):**

    ```bash
    python -m venv venv
    ```

4.  **Activate the virtual environment:**

    * **On Windows:**

        ```bash
        venv\Scripts\activate
        ```

    * **On macOS and Linux:**

        ```bash
        source venv/bin/activate
        ```

5.  **Install dependencies:**

    ```bash
    pip install Flask Flask-SQLAlchemy
    ```

6.  **Run the application:**

    ```bash
    python app.py
    ```

7.  **Access the application in your web browser:**

    ```
    [http://localhost:5002]
    ```

## Database Setup

* The application uses SQLite by default. The database file (`inventory.db`) will be created automatically when you run the application for the first time.
* If you want to use PostgreSQL, you'll need to install it and configure the database connection in the `app.py` file.

## Future Enhancements

* Implement user authentication and authorization.
* Add more detailed reporting features.
* Implement a more advanced notification system.
* Improve the user interface and user experience.
* Add the ability to upload or export data in CSV or Excel format.
* Implement barcode scanning for faster item check-in/check-out.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.