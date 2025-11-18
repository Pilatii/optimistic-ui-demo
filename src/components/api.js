export function simulateAPI(shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error('Falha na sincronização'));
            } else {
                resolve({ success: true });
            }
        }, 1500);
    });
}