import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Todo Mobile',
      home: const TodoPage(),
    );
  }
}

class TodoPage extends StatefulWidget {
  const TodoPage({super.key});
  @override
  State<TodoPage> createState() => _TodoPageState();
}

class _TodoPageState extends State<TodoPage> {
  final _todos = <Map>[];
  final _ctrl = TextEditingController();

  Future<void> _load() async {
    final res = await http.get(Uri.parse('http://localhost:3001/todos'));
    setState(() {
      _todos.clear();
      _todos.addAll(json.decode(res.body));
    });
  }

  Future<void> _add() async {
    await http.post(Uri.parse('http://localhost:3001/todos'),
        body: {'title': _ctrl.text});
    _ctrl.clear();
    _load();
  }

  @override
  void initState() {
    super.initState();
    _load();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Todos')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _ctrl,
                    decoration: const InputDecoration(labelText: 'New todo'),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.add),
                  onPressed: _add,
                ),
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: _todos.length,
              itemBuilder: (_, i) => CheckboxListTile(
                value: _todos[i]['done'],
                onChanged: (_) async {
                  await http.put(
                      Uri.parse('http://localhost:3001/todos/${_todos[i]['id']}/done'));
                  _load();
                },
                title: Text(_todos[i]['title']),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
