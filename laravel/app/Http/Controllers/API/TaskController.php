<?php

namespace App\Http\Controllers\API;
use App\Models\Task;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class TaskController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api')->except(['show']);
    }

    public function index()
    {
        return Task::all();
    }

    public function store(Request $request)
    {
        $task = Task::create($request->all());

        return response()->json($task, 201);
    }

    public function show(Task $task)
    {
        return $task;
    }

    public function update(Request $request, Task $task)
    {
        $task->update($request->all());

        return response()->json($task, 200);
    }

    public function delete(Task $task)
    {
        $task->delete();

        return response()->json(null, 204);
    }

    public function assignTask(Task $task, User $user)
    {
        $task->user_id = $user->id;
        $task->save();

        return response()->json($task, 200);
    }

    public function taskByUserAndStatus(User $user)
    {
        $allStatus = ['ToDo', 'InProgress', 'Completed', 'ETC'];
        $tasks = DB::table('tasks')
        ->where('user_id', $user->id)
        ->get();

        $groupedTasks = [];
        foreach ($allStatus as $status) {
        $filteredTasks = $tasks->filter(function ($task) use ($status) {
        return $task->status === $status;
        });
        $groupedTasks[] = [
        'id' => $status,
        'tasks' => $filteredTasks->map(function ($task) {
        return [
        'id' => $task->id,
        'title' => $task->title,
        'description' => $task->description,
        ];
        })->values()->toArray(),
        ];
        }

        return response()->json([
        'data' => $groupedTasks,
        ], 200);
    }
}
