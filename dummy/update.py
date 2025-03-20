import json
import random

# Load the JSON file
with open("parties.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# Kenyan phone number prefixes
kenyan_prefixes = ["+254700", "+254701", "+254702", "+254703", "+254704", "+254705", 
                   "+254706", "+254707", "+254708", "+254709", "+254710", "+254711",
                   "+254712", "+254713", "+254714", "+254715", "+254716", "+254717",
                   "+254718", "+254719", "+254720", "+254721", "+254722", "+254723",
                   "+254724", "+254725", "+254726", "+254727", "+254728", "+254729"]

# Generate a random Kenyan phone number (7-digit suffix)
def generate_kenyan_phone():
    prefix = random.choice(kenyan_prefixes)
    number = "".join(str(random.randint(0, 9)) for _ in range(4))  # Always 7 digits
    return f"{prefix}{number}"

# Update only necessary fields
for entry in data:
    # Ensure currency is KES
    entry["currency"] = "KES"

    # Generate a new Kenyan phone number (REPLACES ALL EXISTING ONES)
    entry["phone"] = generate_kenyan_phone()

    # Rename tax-related fields if they haven't been renamed yet
    if "gstType" in entry and "vatType" not in entry:
        entry["vatType"] = entry.pop("gstType")

    if "gstin" in entry and "kraPin" not in entry:
        entry["kraPin"] = entry.pop("gstin")

# Save the updated JSON file
with open("updated_parties.json", "w", encoding="utf-8") as file:
    json.dump(data, file, indent=4)

print("✅ JSON file updated successfully with correct Kenyan phone numbers, currency, and tax terminologies!")
