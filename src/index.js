import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            console.log(response.data);
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject() {
        console.log('response.data');
        const response = await api.post('projects',{
            title: `Novo projeto ${Date.now()}`,
            owner: 'João Mangueira'
        });

        const project = response.data;

        setProjects([...projects, project]);
    }


    return (
        <>
            <StatusBar barStyle='light-content' backgroundColor="#7159c1"/>

            {/*<ScrollView style={styles.container}>
                {projects.map(project => (
                    <Text style={styles.title} key={project.id}>{project.title}</Text>
                ))}
            </ScrollView>*/}
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={projects}
                    keyExtractor={project => project.id}
                    renderItem={({item: project}) => (
                        <Text style={styles.project}>{project.title}</Text>
                    )}
                />
                <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.button}
                    onPress={handleAddProject}
                >
                    <Text style={styles.buttonText}>Adicionar projeto</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
        justifyContent: 'center',
        alignItems: 'center'
    },

    project: {
        color: '#FFF',
        fontSize: 30,
    },

    button: {
        backgroundColor: '#FFF',
        margin: 20,
        height: 50,
        width: 200,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
    }
});
