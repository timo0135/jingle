const DIRECTUS_URL = "http://directus:8055"; // URL de ton Directus
const ADMIN_EMAIL = "admin@example.com"; // Email de l'admin
const ADMIN_PASSWORD = "d1r3ctu5"; // Mot de passe de l'admin

async function getAdminToken() {
    const response = await fetch(`${DIRECTUS_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
        }),
    });

    const data = await response.json();
    return data.data.access_token;
}

async function collectionExists(token, collectionName) {
    const response = await fetch(`${DIRECTUS_URL}/collections`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();
    return data.data.some(collection => collection.collection === collectionName);
}

async function createMusicCollection(token) {
    const collectionName = "music";
    const exists = await collectionExists(token, collectionName);

    if (exists) {
        console.log(`✅ Collection '${collectionName}' already exists!`);
        return;
    }

    const response = await fetch(`${DIRECTUS_URL}/collections`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "collection": collectionName,
            "meta": {
                "collection": "music",
                "hidden": false,
                "singleton": false,
                "archive_field": "status",
                "archive_value": "archived",
                "unarchive_value": "draft",
                "archive_app_filter": true,
                "sort_field": "sort",
                "item_duplication_fields": null,
                "sort": 1
            },
            "schema": {
                "name": "pages",
                "comment": null
            },
            "fields": [
                {
                    "field": "id",
                    "type": "uuid",
                    "schema": {
                        "default_value": "gen_random_uuid()",
                        "is_primary_key": true,
                        "has_auto_increment": false,
                    }
                },
                {
                    "field": "name",
                    "type": "string",
                    "interface": "text-input",
                    "required": true,
                    "validation": { min: 1, max: 255 },
                },
                {
                    "field": "mp3",
                    "type": "string",
                    "interface": "text-input",
                    "required": true,
                    "validation": { max_size: 10000000 }, // Taille maximale (par exemple, 10 Mo)
                },
            ]
        }),
    });

    const data = await response.json();
    if (data.data) {
        console.log("✅ Collection 'music' créée avec succès !");
    } else {
        console.error("❌ Erreur lors de la création de la collection 'music'", data);
    }
}

async function main() {
    const token = await getAdminToken();
    await createMusicCollection(token);
}

main();
