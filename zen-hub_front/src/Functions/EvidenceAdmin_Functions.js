export const fetchEvidences = async (groupField, orderField, userSearch) => {

    const adminEvidenceURL = `http://localhost:4000/evidence/dashboard?groupField=${encodeURIComponent(groupField)}&orderField=${encodeURIComponent(orderField)}&userSearch=${encodeURIComponent(userSearch)}`;

    const token = localStorage.getItem('token');

    const data = await fetch(adminEvidenceURL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!data.ok) {
    throw new Error(`Error HTTP: ${data.status}`);
    }
    return await data.json();
}