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

export const checkEvidenceFunction = async (id_evidence, progress, courseName) => {
    const checkEvidenceURL = `http://localhost:4000/evidence/check`;

    const token = localStorage.getItem('token');

    const data = await fetch(checkEvidenceURL, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
            id_evidence: id_evidence,
            progress: progress,
            courseName: courseName
        })
    })

    if (!data.ok) {
        throw new Error(`Error HTTP: ${data.status}`);
        }
        return await data.json();
}